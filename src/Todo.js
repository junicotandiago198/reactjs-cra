import { useState } from 'react';

function Todo() {
  // state untuk nama activitynya
  const [activity, setActivity] = useState('');
  const [edit, setEdit] = useState({});
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState('');

  function generateId() {
    return Date.now();
  }

  // Supaya formnnya tidak reload
  function saveTodoHandler(event) {
    event.preventDefault();

    if (!activity) {
      return setMessage('Nama aktifitas jangan kosong');
    }

    setMessage('');

    if (edit.id) {
      // buat objectnya yang baru
      const updateTodo = {
        ...edit,
        activity,
      };

      // mencari data todo berdasarkan index array
      const editTodoIndex = todos.findIndex(function (todo) {
        return todo.id === edit.id;
      });

      // memindahkan atau ekstrak ke array yang baru
      const updatedTodos = [...todos];

      // ambil posisi todo indexnya
      updatedTodos[editTodoIndex] = updateTodo;
      // console.log(updatedTodos[editTodoIndex]);

      setTodos(updatedTodos);

      // untuk mengembalikan ke mode tambah
      return cancelEditHandler();
    }

    // disini fungsi add
    // mengambil dari state activity untuk valuenya
    setTodos([
      ...todos,
      {
        id: generateId(),
        activity,
        done: false,
      },
    ]);
    setActivity('');
  }

  function removeTodoHandler(todoId) {
    const filteredTodos = todos.filter(function (todo) {
      // console.log(todoId, todo.id);
      return todo.id !== todoId;
    });
    // console.log(filteredTodos);
    setTodos(filteredTodos);

    if (edit.id) cancelEditHandler();
  }

  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }

  function cancelEditHandler() {
    setEdit({});
    setActivity('');
  }

  function doneTodoHandler(todo) {
    const updateTodo = {
      ...todo,
      // id: todo.id,
      // activity: todo.activity,

      // dicek jadi true di uncheck jadi false
      done: todo.done ? false : true,
    };

    // mencari data todo berdasarkan index array
    const editTodoIndex = todos.findIndex(function (currentTodo) {
      return currentTodo.id === todo.id;
    });

    // memindahkan atau ekstrak ke array yang baru
    const updatedTodos = [...todos];

    // ambil posisi todo indexnya
    updatedTodos[editTodoIndex] = updateTodo;
    // console.log(updatedTodos[editTodoIndex]);

    setTodos(updatedTodos);
  }

  return (
    <>
      <h1>Simple Todo List</h1>
      {message && <div style={{ color: 'red' }}>{message}</div>}
      <form onSubmit={saveTodoHandler}>
        <input
          type="text"
          placeholder="Nama aktifitas"
          value={activity}
          onChange={function (event) {
            setActivity(event.target.value);
          }}
        />
        <button type="submit">{edit.id ? 'Simpan Perubahan' : 'Tambah'}</button>
        {edit.id && <button onClick={cancelEditHandler}>Batal Edit</button>}
      </form>
      {todos.length > 0 ? (
        <ul>
          {todos.map(function (todo) {
            return (
              <li key={todo.id}>
                <input type="checkbox" onChange={doneTodoHandler.bind(this, todo)} />
                {todo.activity}({todo.done ? 'selesai' : 'belum selesai'})<button onClick={editTodoHandler.bind(this, todo)}>Edit</button>
                <button onClick={removeTodoHandler.bind(this, todo.id)}>Hapus</button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>
          <i>Tidak ada todo</i>
        </p>
      )}
    </>
  );
}

export default Todo;
