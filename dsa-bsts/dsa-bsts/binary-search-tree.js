class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let currentNode = this.root;

    while (true) {
      if (val === currentNode.val) return "No duplicates";

      if (val < currentNode.val) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return this;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return this;
        }
        currentNode = currentNode.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }
    const insertNode = (node) => {
      if (val === node.val) return undefined;
      if (val < node.val) {
        if (!node.left) {
          node.left = newNode;
          return this;
        }

        return insertNode(node.left);
      }

      if (val > node.val) {
        if (!node.right) {
          node.right = newNode;
          return this;
        }

        return insertNode(node.right);
      }
    };

    return insertNode(this.root);
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    //if tree is empty
    if (!this.root) return undefined;

    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.val === val) return currentNode;
      if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return undefined;
  }
  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const findNode = (node) => {
      if (!node) return undefined;
      if (val === node.val) return node;
      if (val < node.val) {
        return findNode(node.left);
      } else {
        return findNode(node.right);
      }
    };

    return findNode(this.root);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let data = [];
    let current = this.root;
    function traverse(node) {
      data.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(current);
    return data;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let data = [];
    let current = this.root;
    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(current);
    return data;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let data = [];
    let current = this.root;
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.val);
    }
    traverse(current);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let node = this.root;
    let q = [];
    let visited = [];
    q.push(node);

    while (q.length) {
      node = q.shift();
      visited.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let found = false;
    const removeNode = (node, val) => {
      if (!node) return null;

      if (val === node.val) {
        found = true;

        if (!node.left && !node.right) return null;

        if (!node.left) return node.right;

        if (!node.right) return node.left;

        let temp = node.right;

        while (temp.left) {
          temp = temp.left;
        }

        node.val = temp.val;

        node.right = removeNode(node.right, temp.val);
        return node;
      }

      if (val < node.val) {
        node.left = removeNode(node.left, val);

        return node;
      } else {
        node.right = removeNode(node.right, val);

        return node;
      }
    };
    this.root = removeNode(this.root, val);
    if (!found) return "Node is not found in tree.";
    return this;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const height = (node) => {
      if (!node) return 0;
      return 1 + Math.max(height(node.left), height(node.right));
    };
    const isBalanced = (node) => {
      if (!node) return true;

      const leftHeight = height(node.left);
      const rightHeight = height(node.right);
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
      return isBalanced(node.left) && isBalanced(node.right);
    };
    return isBalanced(this.root);
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;
    let parent = null;
    let current = this.root;
    const findNode = (node) => {
      //console.log("Parent:", parent.val, "Current:", current.val);
      if (current.right) {
        parent = current;
        current = current.right;
        return findNode(current);
      }
      if (current.left) {
        current = current.left;
        while (current.right) current = current.right;
        return current.val;
      }
      return parent.val;
    };

    return findNode(this.root);
  }
}

module.exports = BinarySearchTree;
