'use babel'

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('FuzzyFinderSwitchFirst', () => {
  let workspaceElement

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace)
  })

  describe('when the fuzzy-finder:toggle-file-finder event is triggered', () => {
    it('overrides the filter function of the select list view', () => {
      waitsForPromise(() => atom.packages.activatePackage('fuzzy-finder-switch-first'))

      runs(() => {
        const p = atom.packages.getActivePackage('fuzzy-finder-switch-first')
        expect(p.mainModule.originalFilter).toEqual(null)
      })

      // This is an activation event, triggering it will cause the package to be activated.
      waitsForPromise(() => atom.commands.dispatch(workspaceElement, 'fuzzy-finder:toggle-file-finder'))

      runs(() => {
        const p = atom.packages.getActivePackage('fuzzy-finder-switch-first')
        expect(typeof p.mainModule.originalFilter).toBe('function')
      })
    })

    // todo test that it actually reorders, maybe adopt tests from fuzzy finder
  })
})
