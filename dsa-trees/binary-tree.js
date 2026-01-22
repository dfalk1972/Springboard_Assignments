/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
  insertLeft(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
  }

  insertRight(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    let depth = 0;
    let counter = 0;
    function traverse(node) {
      if (!node) return;
      counter++;
      if (!node.left && !node.right) {
        if (depth === 0 || counter < depth) depth = counter;
      } else {
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
      }
      counter--;
    }
    traverse(this.root);
    return depth;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    let depth = 0;
    let counter = 0;
    function traverse(node) {
      if (!node) return 0;
      counter++;
      if (!node.left && !node.right) {
        if (depth === 0 || counter > depth) depth = counter;
      } else {
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
      }
      counter--;
    }
    traverse(this.root, 0);
    return depth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  maxSum() {
    if (!this.root) return 0;
    let max = -Infinity;
    function traverse(node) {
      if (!node) return 0;
      let leftSum = Math.max(0, traverse(node.left));
      let rightSum = Math.max(0, traverse(node.right));
      let currentPathSum = node.value + leftSum + rightSum;
      max = Math.max(max, currentPathSum);
      return node.value + Math.max(leftSum, rightSum);
    }
    traverse(this.root);
    return max;
  }
  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let nextLarger = null;
    function traverse(node) {
      if (!node) return;
      if (node.value <= lowerBound) return;
      if (node.value > lowerBound) {
        if (nextLarger === null || node.value < nextLarger) {
          nextLarger = node.value;
        }
      }
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return nextLarger;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root) return false;
    if (node1 === node2) return false;

    const findParentAndDepth = (targetNode) => {
      let q = [];
      q.push({ node: this.root, parent: null, depth: 0 });

      while (q.length > 0) {
        let current = q.shift();
        let currentNode = current.node;
        let currentParent = current.parent;
        let currentDepth = current.depth;

        if (currentNode === targetNode) {
          return { parent: currentParent, depth: currentDepth };
        }

        if (currentNode.left) {
          q.push({
            node: currentNode.left,
            parent: currentNode,
            depth: currentDepth + 1,
          });
        }
        if (currentNode.right) {
          q.push({
            node: currentNode.right,
            parent: currentNode,
            depth: currentDepth + 1,
          });
        }
      }
      return null;
    };
    const info1 = findParentAndDepth(node1);
    const info2 = findParentAndDepth(node2);

    if (!info1 || !info2) return "node not found in tree";
    return info1.depth === info2.depth && info1.parent !== info2.parent;
  }

  static serialize(tree) {
    let data = [];
    let current = tree.root;
    let dataString = "";

    function traverse(node) {
      if (!node) {
        data.push("null");
        return;
      }
      data.push(node.value);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(current);
    dataString = data.join(",");
    return dataString;
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(string) {
    if (!string || string.length === 0) return new BinaryTree();
    const values = string.split(",");
    let idx = 0;
    function buildTree() {
      if (idx >= values.length) return null;
      const value = values[idx];
      idx++;

      if (value === "null") return null;
      const node = new BinaryTreeNode(Number(value));

      node.left = buildTree();

      node.right = buildTree();

      return node;
    }
    const root = buildTree();
    return new BinaryTree(root);
  }
  /** Further study!
  /** lowestCommonAncestor(node1, node2): find the lowest common ancestor
 * of two nodes in a binary tree. */
  lowestCommonAncestor(node1, node2) {
    function traverse(node) {
      if (!node) return null;
      if (node === node1 || node === node2) return node;

      let left = traverse(node.left);
      let right = traverse(node.right);
      if (left && right) return node;

      return left || right;
    }

    return traverse(this.root);
  }
}
module.exports = { BinaryTree, BinaryTreeNode };
