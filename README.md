# Phylocanvas History Plugin
Visual History for Phylocanvas

## Usage
```
npm install phylocanvas phylocanvas-plugin-history
```
```javascript
import Phylocanvas from 'phylocanvas';
import historyPlugin from 'phylocanvas-plugin-history';

Phylocanvas.plugin(historyPlugin);

Phylocanvas.createTree('id', {
  history: {
    collapsed: false, // open history on tree load
  }
})
```
