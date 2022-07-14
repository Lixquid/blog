---
title: "House Rules: Prediction Whist"
date: 2018/03/07
tags:
    - houserules
    - games
---

This is a relatively popular card game among my friends that we enjoy
playing. It's one of those many variants of "Oh Hell", canonized here so we
don't keep forgetting the rules (oops).

## Glossary ##

- **Trick**: One card from each player.
    - A **Trick's Suit** is the suit of the card that was played first in that
      trick.
    - A trick is **won** or **taken** by whoever plays the highest *Trump
      Card* in the trick, or if no trumps were played, whoever played the
      highest card of that trick's Suit.
- **Trump Suit**: The suit that beats all other suits. In this case, always
  :diamonds: *Diamonds*.
    - **Trump**: A card whose suit is a *Trump Suit*.
- **Dealer**: The person dealing the cards. This position rotates clock-wise by
  one person every round.

## Rules ##

- All players start with 3 lives.
- If a player loses all of their lives, they are out of the game and are no
  longer dealt any cards.
- The game ends when there is one or less players with lives remaining.

## Starting a Round ##

- The Dealer deals a number of cards to each player. If this is the first round,
  everyone is dealt 7 cards.
- Everyone may now look at their hand.
- The person to the left of the Dealer then predicts how many tricks they think
  they will take with that hand during the round. This can be as low as 0, or
  as high as all tricks in the hand.
- Going clock-wise, every in turn predicts how many tricks they think they will
  take.
- The Dealer also predicts how many tricks they think they will take, with one
  caveat: They *cannot* predict a number that would cause the number of
  predicted tricks to equal the number of cards in the hand. Put another way:
  someone must be wrong with their prediction every round.

    > **Example**: There are 7 cards in the hand.
    > - Player A predicts 3
    > - Player B predicts 2
    > - Player C, the dealer, *cannot* predict 2, as $`3 + 2 + 2 = 7`$.

## During a Round ##

- When all players have predicted how many tricks they think they will take,
  play starts. The person left of the Dealer is the first person with control.
- The person with control starts the trick. They can place down any card from
  their hand.
- Going clockwise, each player plays a card from their hand on the trick.
    - If a player has a card whose suit matches the *Trick's Suit*, they must
      play a card of that suit.
    - If a player does not have a card of the *Trick's Suit*, they can play
      any card.
- After all players have played a card, the Trick's winner is determined as
  follows:
    - If any *Trump cards* were played (or the Trick's suit is the Trump suit),
      the player who played the highest Trump card wins.
    - Otherwise, the highest card of the Trick's suit wins.
    - Cards that are neither the Trump suit nor the Trick's suit will never win
      a trick.
- The player that wins the trick then assumes control, and is the first to put
  down a new card next Round.
- Round play continues until not more cards are left, and all tricks have been
  won.

## After a Round ##

- Each player confirms if the number of tricks they won matched their
  prediction. All players that predicted incorrectly (higher or lower) lose 1
  life.
    - If only one player has any lives remaining, they are the winner.
    - If all players lost all of their lives, a draw is declared.
- The Dealer position moves by one clockwise, and the number of cards dealt at
  the start of the round decreases by one. If only one card was used last round,
  the number of cards increases back up to the initial amount (7).

## Variations ##

- Large number of Players
    - If more than 7 players would like to play, the number of initial cards
      can be decreased.

        > **Example**: If 8 players want to play, $`52 / 8 = 6.5`$, so the
        > starting hand will have 6 cards.
- Double Nil
    - A player can opt to not look at their cards, and when it's their turn to
      predict, predict a *Double Nil*. A Double Nil prediction will restore one
      life if correctly played.
