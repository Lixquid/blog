---
title: Garmin Development Style
date: 2023/07/17
tags:
    - garmin
---

Unlike Android Wear (Java) or Fitbit (JavaScript), Garmin apps and watch faces
are written in their own custom language, called Monkey C. It's a bit of a
mash-up of C, Java, and JavaScript, with reference counting memory management
and heavy object orientation.

While this means it's pretty well tuned for the platform, it also means there's
not a lot of documentation on how to write good code for it or how to cover
different use cases. This post is a collection of my own personal experiences
and opinions on how to write good code for Garmin devices.

Note that I said _my own_ experiences and opinions. I'm not perfect, and in some
places my advice is going to contradict Garmin's own
[recommended style](https://developer.garmin.com/connect-iq/monkey-c/coding-conventions/).

## Private `_` module

This is rather simple; modules cannot have private members, so a pattern of
putting private members in a module named `_` is used. This makes it clear at
the call site that the member is private, and also avoids importing the private
members when using a `using` import.

```js
module MyModule {
    var publicVar = 1;
    module _ {
        var privateVar = 2;
    }
}
```

## `Data` module

This is a design pattern I've used in a few of my apps, and it's helped
organise the settings and localisation aspects of my apps.

The core idea is to have a single `Data` module that contains the `Settings`
(user-configurable values), `Storage` (private values), and `Strings` (localised
text) modules as appropriate. Each of these modules exposes a `load()` and
(in the case of `Settings` and `Storage`) `save()` function; `load()` is called
when the app starts (and when the settings are changed via
`AppBase.onSettingsChanged`), and `save()` is called after any of the values
are changed.

By having a single module that contains all of these, it's easier to keep track
of what values are stored, and acts as a convenient cache for the values to
avoid having to load them from storage every time they're needed.

An example:

```js title=Data.mc
module Data {
    module Settings {
        var target as Number = 0;
        function load() {
            target = Properties.getValue("Setting_Target");
        }
        function save() {
            Properties.setValue("Setting_Target", target);
        }
    }

    module Storage {
        var lastUpdate as Number = 0;
        function load() {
            lastUpdate = _.l("sLastUpdate", lastUpdate);

        }
        function save() {
            Storage.setValue("sLastUpdate", lastUpdate);
        }

        // Note: It helps to create a helper function that loads a value but
        // also accepts a default value to use if the value is not set. By
        // passing in the original key, the default set via `=` will be used
        // if the value is not set.
        module _ {
            function l(key as String or Number, defaultValue) {
                var v = Storage.getValue(key);
                return v == null ? defaultValue : v;
            }
        }
    }

    module Strings {
        var AppName as String = "";

        function load() {
            AppName = Application.loadResource($.Rez.Strings.AppName);
        }
    }
}
```

```js title=App.mc
class App extends Toybox.Application.AppBase {
    function getInitialView() {
        Data.Settings.load();
        Data.Storage.load();
        Data.Strings.load();
        // ...
    }

    function onSettingsChanged() {
        Data.Settings.load();
        // ...
    }
}
```

```js title="Updating Values"
// ...
Data.Storage.lastUpdate = 42;
Data.Storage.save();
// ...
```

## Monkey Types

(Or, avoiding `Cannot determine if container access is using container type`).

Monkey Types are good for catching type errors, but their type inference can
often be a bit lacking, and the rules for what can be typed is somewhat
inconsistent.

### Module / Class Variables vs Local Variables

> tl;dr: Module / Class Variables are typed on the left side of the assignment,
> local variables are typed on the right side.

By these, I mean:

```js
module MyModule {
    var modVar as Number = 1; // Module variable
    class MyClass {
        var classVar as Number = 2; // Class variable
        function myFunction() {
            var funcVar = 3 as Number; // Local variable
        }
    }
}
```

Class variables are similar to class fields / properties in other object
oriented languages, and have the variable typed itself.

Module variables, despite acting like local variables (not requiring an instance
to access), are more similar to class variables and require the variable to be
typed on the left side of the assignment.

Local variables _cannot_ have the variable itself typed, and instead always
infer the type from the value first assigned to it. If you want to type the
variable as something other than the type of the value, you need to cast it.
(For example: `var role = 2 as Number or Null;`).

### Cannot determine if container access is using container type

This error happens when you access an untyped container (either an `Array` or
`Dictionary`). Because the type inference does not automatically infer the types
of the contents of the container, you need to explicitly type the container to
the type of its contents.

```js
class MyClass {
    var untyped = [1, 2, 3]; // Untyped
    var typedClass as Array<Number> = [1, 2, 3]; // Typed
    function foo() {
        var typedFunc = [1, 2, 3] as Array<Number>; // Typed

        typedFunc[0]; // No error
        typedClass[0]; // No error
        untyped[0]; // Error: Cannot determine if container access is using
                    // container type
    }
}
```
