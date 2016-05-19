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
    parentElement: null, // defaults to tree.containerElement
  }
})
```
_N.B. It is the responsibility of the developer to ensure that the overflow of the parent element is hidden._

## Style
An unstyled bundle is also available:
```javascript
import historyPlugin from 'phylocanvas-plugin-history/unstyled';
```

## Events
A `historytoggle` event is fired when the history is opened or closed, with an `isOpen` flag in the event data.
