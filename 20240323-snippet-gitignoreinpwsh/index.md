---
title: "Snippet: Creating a .gitignore file in PowerShell"
date: 2024/03/23
tags:
    - snippets
    - powershell
---

Welcome to snippets! This is a new series of posts where I'll be sharing small
scripts or commands that I've found useful. I'll try and keep them as
self-contained as possible, so you can copy and paste them into your own
scripts or use them as-is. If you'd like this function to be available
everywhere, open your profile file (`notepad $PROFILE`), and paste it in there.

Today's snippet is a simple script to get a language or framework specific
`.gitignore` file from GitHub. I'm not a massive fan of project creation tools
that create entire directories full of files I don't need, so I like to start
with a `.gitignore` file and build up from there.

```powershell
function New-GitIgnore {
    <#
    .SYNOPSIS
        Creates a new gitignore file from the github gitignore template
        repository.
    .PARAMETER Type
        Mandatory.

        The type of gitignore to create.
    .EXAMPLE
        New-GitIgnore Node
    #>
    param (
        [Parameter(Mandatory)]
        [ValidateSet(
            IgnoreCase = $false,
            "AL", "Actionscript", "Ada", "Agda", "Android", "AppEngine",
            "AppceleratorTitanium", "ArchLinuxPackages", "Autotools", "C++",
            "C", "CFWheels", "CMake", "CUDA", "CakePHP", "ChefCookbook",
            "Clojure", "CodeIgniter", "CommonLisp", "Composer", "Concrete5",
            "Coq", "CraftCMS", "D", "DM", "Dart", "Delphi", "Drupal",
            "EPiServer", "Eagle", "Elisp", "Elixir", "Elm", "Erlang",
            "ExpressionEngine", "ExtJs", "Fancy", "Finale", "FlaxEngine",
            "ForceDotCom", "Fortran", "FuelPHP", "GWT", "Gcov", "GitBook",
            "Go", "Godot", "Gradle", "Grails", "Haskell", "IGORPro", "Idris",
            "JBoss", "JENKINS_HOME", "Java", "Jekyll", "Joomla", "Julia",
            "KiCad", "Kohana", "Kotlin", "LabVIEW", "Laravel", "Leiningen",
            "LemonStand", "Lilypond", "Lithium", "Lua", "Magento", "Maven",
            "Mercury", "MetaProgrammingSystem", "Nanoc", "Nim", "Node",
            "OCaml", "Objective-C", "Opa", "OpenCart", "OracleForms", "Packer",
            "Perl", "Phalcon", "PlayFramework", "Plone", "Prestashop",
            "Processing", "PureScript", "Python", "Qooxdoo", "Qt", "R", "ROS",
            "Racket", "Rails", "Raku", "RhodesRhomobile", "Ruby", "Rust",
            "SCons", "Sass", "Scala", "Scheme", "Scrivener", "Sdcc", "SeamGen",
            "SketchUp", "Smalltalk", "Stella", "SugarCRM", "Swift", "Symfony",
            "SymphonyCMS", "TeX", "Terraform", "Textpattern", "TurboGears2",
            "TwinCAT3", "Typo3", "Unity", "UnrealEngine", "VVVV",
            "VisualStudio", "Waf", "WordPress", "Xojo", "Yeoman", "Yii",
            "ZendFramework", "Zephir"
        )]
        [string] $Type
    )

    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/github/gitignore/master/$Type.gitignore" -OutFile .gitignore
}
```

How it works is pretty simple; the only parameter has a validation set of all
the available `.gitignore` files in the community maintained gitignore
repository, and that file is downloaded and saved as `.gitignore` in the
current directory.

(Having a validated set of options allows for tab completion in PowerShell,
which is a nice touch.)

---

It's likely that this list of `.gitignore` files will change over time, so you
can use this snippet to get the most up-to-date list, formatted for use in the
`ValidateSet` attribute:

```powershell
# Get the list of files / directories in the repository
$body = Invoke-RestMethod "https://api.github.com/repos/github/gitignore/git/trees/main"

$formats = $body.tree | Where-Object {
    # Only look at files that end in .gitignore
    $_.type -eq "blob" -and $_.path -match "\.gitignore$"
} | ForEach-Object {
    # Wrap in quotes and remove the .gitignore extension
    "`"" + ($_.path -replace "\.gitignore$", "") + "`""
}

# Output the list, joined by commas
Write-Output ($formats -join ", ")
```
