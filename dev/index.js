import PhyloCanvas from 'phylocanvas';
import historyPlugin from '../src/index';

PhyloCanvas.plugin(historyPlugin);

const tree = PhyloCanvas.createTree('phylocanvas');

tree.showLabels = true;
tree.hoverLabel = true;
tree.setTreeType('rectangular');

const subtreeButton = document.createElement('button');
subtreeButton.innerHTML = 'subtree';
subtreeButton.addEventListener('click', () => {
  const branch = tree.branches['E'];
  branch.redrawTreeFromBranch();
});
document.body.appendChild(subtreeButton);

const resetButton = document.createElement('button');
resetButton.innerHTML = 'Redraw Original';
resetButton.addEventListener('click', () => tree.redrawOriginalTree());
document.body.appendChild(resetButton);


tree.on('error', function (event) { throw event.error; });

tree.on('loaded', function () {
  console.log('loaded');
});

tree.load('((B:0.2,(C:0.3,(G:0.2,H:0.3)D:0.4)E:0.5)F:0.1)A;');
