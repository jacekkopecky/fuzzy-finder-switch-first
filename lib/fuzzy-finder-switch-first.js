'use babel'

import { CompositeDisposable } from 'atom'

export default {

  subscriptions: null,
  fuzzyFinderPackage: null,
  originalFilter: null,

  activate (state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fuzzy-finder:toggle-file-finder': async () => {
        if (!this.originalFilter) {
          const ffPackage = await this.getFFPackage()
          const selectListView = ffPackage.mainModule.createProjectView().selectListView
          if (selectListView.props.filter) {
            this.originalFilter = selectListView.props.filter
            selectListView.update({ filter: this.filter.bind(this) })
          }
        }
      }
    }))
  },

  async getFFPackage () {
    if (!this.fuzzyFinderPackage) {
      await atom.packages.activatePackage('fuzzy-finder')
      this.fuzzyFinderPackage = atom.packages.getActivePackage('fuzzy-finder')
    }
    return this.fuzzyFinderPackage
  },

  filter (items, query) {
    const filtered = this.originalFilter(items, query)

    if (filtered.length > 1) {
      const activePaneItem = atom.workspace.getActivePaneItem()
      if (activePaneItem && activePaneItem.getPath && activePaneItem.getPath() === filtered[0].filePath) {
        const x = filtered[0]
        filtered[0] = filtered[1]
        filtered[1] = x
        console.log('switched')
      }
    }

    return filtered
  },

  deactivate () {
    return this.subscriptions.dispose()
  }

}
