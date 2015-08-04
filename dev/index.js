import * as PhyloCanvas from '../node_modules/PhyloCanvas/src/index';
import historyPlugin from '../src/index';

PhyloCanvas.plugin(historyPlugin);

const tree = PhyloCanvas.createTree('phylocanvas', {
  history: {
    collapsed: true,
  },
});

tree.showLabels = true;
tree.hoverLabel = true;

tree.on('error', function (event) { throw event.error; });

tree.on('loaded', function () {
  console.log('loaded');
  // tree.viewMetadataColumns();
});

tree.load('((B:0.2,(C:0.3,(G:0.2,H:0.3)D:0.4)E:0.5)F:0.1)A;');
