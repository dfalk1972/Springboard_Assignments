/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;
    let sum = 0;
    function traverse(node) {
      sum += node.val;
      for (let child of node.children) {
        traverse(child);
      }
    }
    traverse(this.root);
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let evens = 0;
    if (!this.root) return 0;
    function traverse(node) {
      if (node.val % 2 === 0) evens++;

      for (let child of node.children) {
        traverse(child);
      }
    }
    traverse(this.root);
    return evens;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let amtGreaterThan = 0;
    if (!this.root) return 0;
    function traverse(node) {
      if (node.val > lowerBound) amtGreaterThan++;

      for (let child of node.children) {
        traverse(child);
      }
    }
    traverse(this.root);
    return amtGreaterThan;
  }
}

module.exports = { Tree, TreeNode };
