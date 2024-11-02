import React, { useEffect, useRef, useState } from 'react';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from '../Config/firebaseconfig';
import { onAuthStateChanged } from "firebase/auth";

const Todo = () => {
    const todoInput = useRef();
    const [todo, setTodo] = useState([]);
    const [user, setUser] = useState(null);
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                getDataFromFirestore(currentUser.uid);
            }
        });
        return () => unsubscribe();
    }, []);

    const getDataFromFirestore = async (uid) => {
        if (!uid) return;
        const q = query(collection(db, "todo"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const todos = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            docid: doc.id
        }));
        setTodo(todos);
    };

    const addTodo = async (event) => {
        event.preventDefault();
        if (!user) return;
    
        const title = todoInput.current.value.trim();
        if (!title) return; 
    
        try {
            const docRef = await addDoc(collection(db, "todo"), {
                title,
                uid: user.uid
            });
    
     
            setTodo((prevTodos) => [
                ...prevTodos,
                { title, uid: user.uid, docid: docRef.id }
            ]);
    
            
            todoInput.current.value = "";
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const startEditing = (item) => {
        setEditingTodoId(item.docid);
        setEditingTitle(item.title);
    };

    const saveEdit = async (docid) => {
        try {
            const todoRef = doc(db, "todo", docid);
            await updateDoc(todoRef, { title: editingTitle });
            setTodo((prevTodos) => prevTodos.map(todo =>
                todo.docid === docid ? { ...todo, title: editingTitle } : todo
            ));
            setEditingTodoId(null);
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const deleteTodo = async (docid) => {
        try {
            await deleteDoc(doc(db, "todo", docid));
            setTodo((prevTodos) => prevTodos.filter(todo => todo.docid !== docid));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Todo App</h1>
            <form onSubmit={addTodo} className="input-group mb-3">
                <input 
                    type="text" 
                    placeholder="Enter todo" 
                    ref={todoInput} 
                    className="form-control"
                />
                <button type="submit" className="btn btn-primary">Add Todo</button>
            </form>
            <ul className="list-group">
                {todo.length > 0 ? (
                    todo.map(item => (
                        <li key={item.docid} className="list-group-item d-flex justify-content-between align-items-center">
                            {editingTodoId === item.docid ? (
                                <div className="d-flex flex-grow-1">
                                    <input 
                                        type="text" 
                                        value={editingTitle} 
                                        onChange={(e) => setEditingTitle(e.target.value)} 
                                        className="form-control me-2"
                                    />
                                    <button 
                                        onClick={() => saveEdit(item.docid)} 
                                        className="btn btn-success me-2"
                                    >
                                        Save
                                    </button>
                                    <button 
                                        onClick={() => setEditingTodoId(null)} 
                                        className="btn btn-secondary"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <span>{item.title}</span>
                                    <div>
                                        <button 
                                            onClick={() => startEditing(item)} 
                                            className="btn btn-outline-primary btn-sm me-2"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => deleteTodo(item.docid)} 
                                            className="btn btn-outline-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <li className="list-group-item text-center">No Data Found...</li>
                )}
            </ul>
        </div>
    );
};

export default Todo;
