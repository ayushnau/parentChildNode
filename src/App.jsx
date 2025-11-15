import { useEffect, useState, memo, useCallback, createContext, useContext, useMemo } from 'react'
import './App.css'


/*

       folderfile - 
        type - 'folder' | 'file'
        value - bool
        child - [folder, file] || null

*/


// const updateTreeState = (currTree,realTree) =>{
//   console.log(realTree)
//   const treeObject = {};
//   let queue = [];
//   // treeObject[currTree.id] = currTree;
//   queue.push(realTree);

//   while(queue.length != 0){
//     const curr  = queue.shift();
//     console.log({curr})
//     treeObject[curr.id] = curr;
//     curr.child && curr.child.map((val)=>{
//         console.log({val})
//         if(val != null){
//           queue.push(val);
//         }
//     })
//   }
//   console.log(treeObject)


//   queue.push(realTree);
//   while(queue.length != 0){
//     const curr = queue.shift();
//     if(currTree.id == curr.id){
//       treeObject[currTree.id] = currTree;
//       break;
//     }
//     curr.child && curr.child.map((val)=>{
//       console.log({val})
//       if(val != null){
//         queue.push(val);
//       }
//     })
//   }
//   queue = [];





//   // how will i update the tree complete once i found object to be updtaed. 
// }


// Path-based update: O(depth) instead of O(n) - only updates nodes along the path
// Path is an array of indices: [0, 2, 1] means root -> child[0] -> child[2] -> child[1]
const updateTreeByPath = (tree, path, updater) => {
  // If path is empty, we're at the target node
  if (path.length === 0) {
    return updater(tree);
  }

  // Navigate to the next level using the first index in path
  const [index, ...restPath] = path;
  
  // Create new tree with updated child at the specified index
  return {
    ...tree,
    child: tree.child.map((child, i) => 
      i === index 
        ? updateTreeByPath(child, restPath, updater) // Recurse into the target branch
        : child // Keep other children unchanged (same reference)
    )
  };
};


// Generate unique IDs using timestamp and random string
// This ensures uniqueness even when multiple items are created rapidly
const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// Create Tree Context to avoid prop drilling
const TreeContext = createContext(null);

// Memoized TreeNode component to prevent unnecessary re-renders
// Uses closure-based path builder - path is only computed when needed (on click), not stored in memory
const TreeNode = memo(({ tree, depth = 0, getPath = () => [] }) => {
  // Get callbacks from context
  const { onAddFolderOrFile, onToggleExpand } = useContext(TreeContext);
  
  const isFolder = tree.type === "folder";
  const isFile = tree.type === "file";
  const isExpanded = tree.value;

  // Path is computed lazily only when button is clicked, not during render
  const handleToggle = (e) => {
    e.stopPropagation();
    const path = getPath(); // Compute path only when needed
    onToggleExpand(path, { target: { checked: !isExpanded } });
  };

  const handleAddFolder = () => {
    const path = getPath(); // Compute path only when needed
    onAddFolderOrFile(path, "folder");
  };

  const handleAddFile = () => {
    const path = getPath(); // Compute path only when needed
    onAddFolderOrFile(path, "file");
  };

  return (
    <div className="tree-node">
      <div className="tree-item" style={{ paddingLeft: `${depth * 20}px` }}>
        {isFolder && (
          <div className="folder-container">
            <div className="folder-header">
              <button 
                className="expand-toggle"
                onClick={handleToggle}
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                <span className={`chevron ${isExpanded ? 'expanded' : ''}`}>▶</span>
              </button>
              <span className="folder-icon">📁</span>
              <span className="folder-name">Folder</span>
              <div className="folder-actions">
                <button 
                  className="action-btn add-folder-btn"
                  onClick={handleAddFolder}
                  title="Add Folder"
                >
                  + 📁
                </button>
                <button 
                  className="action-btn add-file-btn"
                  onClick={handleAddFile}
                  title="Add File"
                >
                  + 📄
                </button>
              </div>
            </div>
          </div>
        )}
        {isFile && (
          <div className="file-container">
            <span className="file-icon">📄</span>
            <span className="file-name">File</span>
          </div>
        )}
      </div>
      {isFolder && isExpanded && tree.child && tree.child.length > 0 && (
        <div className="tree-children">
          {tree.child.map((subtree, index) => (
            <TreeNode 
              key={subtree.id} 
              tree={subtree} 
              depth={depth + 1}
              // Pass a closure that builds path only when called (lazy evaluation)
              getPath={() => [...getPath(), index]}
            />
          ))}
        </div>
      )}
    </div>
  );
});

// Add display name for better debugging in React DevTools
TreeNode.displayName = 'TreeNode';

function App() {
  // const [tree, setTree] = useState([{value: true, type: 'folder', child: null}])
  const [tree, setTree] = useState({id: generateId() ,value: true, type: 'folder', child: null})
  
  useEffect(() =>{
    console.log(JSON.stringify(tree, null, 2))
    console.log('rencering')
  },[tree])

  // Path-based callback to add folder or file - O(depth) instead of O(n)
  // Path is an array of indices leading to the target node
  const handleAddFolderOrFile = useCallback((path, type) => {
    setTree(currentTree => {
      return updateTreeByPath(currentTree, path, (node) => {
        // Add new child to this node
        const newChild = { id: generateId(), value: true, type, child: null };
        const childTree = node.child 
          ? [...node.child, newChild]
          : [newChild];
        
        return { ...node, child: childTree };
      });
    });
  }, []); // Empty deps - setTree is stable from useState

  // Path-based callback to toggle expand/collapse - O(depth) instead of O(n)
  const handleToggleExpand = useCallback((path, e) => {
    console.log(e.target.checked);
    setTree(currentTree => {
      const updatedTree = updateTreeByPath(currentTree, path, (node) => {
        return { ...node, value: e.target.checked };
      });
      console.log('Updated tree:', updatedTree);
      return updatedTree;
    });
  }, []); // Empty deps - setTree is stable from useState

  // Memoized context value to prevent unnecessary re-renders of all consumers
  // Only recreates when callbacks change (callbacks are stable due to useCallback)
  const contextValue = useMemo(() => ({
    onAddFolderOrFile: handleAddFolderOrFile,
    onToggleExpand: handleToggleExpand
  }), [handleAddFolderOrFile, handleToggleExpand]);

  return (
    <TreeContext.Provider value={contextValue}>
      <div className="app-container">
        <div className="tree-container">
        <h1 className="app-title">File & Folder Manager</h1>
        <TreeNode tree={tree} getPath={() => []} />
        </div>
      </div>
    </TreeContext.Provider>
  )
}

export default App
