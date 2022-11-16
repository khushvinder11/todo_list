import React, { useEffect, useState } from "react";
import "./TodoListStyle.css";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  console.log(inputValue, "inputvalue");
  const [mapdata, setMapData] = useState([]);
  console.log(mapdata, "mapdata");
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue, "searchvalue");
  const [searchItems, setSearchItems] = useState();
  console.log(searchItems, "searchitems");
  const [edit, setEdit] = useState();
  console.log(edit, "edit id");
  const [showEidticon, setShowEidticon] = useState(true); // add icon change edit icon.....

  //   Add Item function.......................................
  console.log(showEidticon, "showEidticon");
  const addItem = () => {
    if (showEidticon == false) {
      setMapData(
        mapdata.map((v) => {
          console.log(v, "v vv v");
          if (v.id == edit) {
            return { ...v, data: inputValue };
          }
          return v;
        })
      );
      setShowEidticon(true);
      setInputValue("");
    } else {
      if (!inputValue || !inputValue.replace(/\s/g, "")) {
        alert("Plese enter item");
        return;
      } else {
        setMapData([
          ...mapdata,
          { data: inputValue, id: Math.floor(Math.random() * 10) },
        ]);
        setInputValue("");
      }
    }
  };

  //   Edit Item function.....................................

  const editItem = (it) => {
    const editData = mapdata.filter((v) => {
      return v == it;
    });
    setInputValue(editData[0].data);
    setShowEidticon(false);
    setEdit(it.id);
  };

  // Delete Item function.....................................

  const deleteItem = (id) => {
    const deleIetem = mapdata?.filter((elem) => {
      return elem.id !== id;
    });

    setMapData(deleIetem);
  };

  //   Search Item function...................................

  // first way
  const searchitem = (inp) => {
    if (inp?.length) {
      const fetch = mapdata?.filter((v) => v?.data.includes(inp));
      console.log(fetch, "fetch searchitems");
      setSearchItems(fetch);
    } else {
      setSearchItems(mapdata);
    }
  };

  useEffect(() => {
    if (!searchValue) {
      setSearchItems(mapdata);
    }
  }, [mapdata]);

  // second way
  // const db = searchItems?.length ? searchItems : mapdata; // dp.map((v)=> )

  //  onKeyPress function.....................

  const enterkey = (e) => {
    if (e.key == "Enter") {
      addItem();
    }
  };
  return (
    <div className="todolist-body">
      <div class="container">
        {/*   HEADER   */}
        <h1 class="heading">Todo List</h1>
        <div className="input-icon-div">
          <input
            type="text"
            name="search"
            placeholder="Search items"
            onChange={(e) => searchitem(e.target.value)}
          />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        {/*   LIST   */}
        <ul class="list">
          {searchItems?.map((v) => {
            return (
              <li>
                <span>{v?.data}</span>
                <span className="icon-container">
                  <i
                    class="far fa-trash-alt delete"
                    onClick={() => deleteItem(v?.id)}
                  ></i>
                  <i class="fa-solid fa-pen" onClick={() => editItem(v)}></i>
                </span>
              </li>
            );
          })}
        </ul>

        {/*   FORM   */}
        <div class="add-todo">
          <label for="add" class="add-heading">
            Add a new item
          </label>
          <div className="input-icon-div">
            <input
              type="text"
              placeholder="Add todo item"
              name="add"
              id="add"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => enterkey(e)}
            />
            {showEidticon ? (
              <i class="fa-solid fa-plus" onClick={addItem}></i>
            ) : (
              <i
                class="fa-solid fa-pen-to-square"
                onClick={() => {
                  addItem();
                  setShowEidticon(true);
                }}
              ></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
