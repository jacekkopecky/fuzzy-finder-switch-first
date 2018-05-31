# Fuzzy Finder Switch First package

With this Atom package, fuzzy finder will not give the current active editor as
the first match.

For example, you have a project with HTML and JS files named the same but the
file extension, e.g. `project-marking.html` and `project-marking.js`. It makes
sense to find these files by typing `projmar` into fuzzy finder. However, fuzzy
finder puts the `.js` file first, so if the `.js` file is currently open, you
open fuzzy finder, type `projmar`, then pressing enter would just take you where
you already are.

You should be able to open fuzzy finder, type `projmar`, press enter, and be in
**the other file that you know matches**.

This package is a quick hack that implements this change. Every time fuzzy
finder filters, this package checks that if we have more than one match, the
first one shouldn't be the current open buffer – if it is, it switches the first
two matches.
