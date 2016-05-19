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
    unstyled: false,
  }
})
```

## Events
A `historytoggle` event is fired when the history is opened or closed, with an `isOpen` flag in the event data.
