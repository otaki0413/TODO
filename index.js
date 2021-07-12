const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
// データの保存　→　localStorage.getItem('キー')
const todoData = JSON.parse(localStorage.getItem("todoData"));

if (todoData) {
  todoData.forEach(data => {
    console.log(data);
    add(data); // ローカルストレージのデータから再度リストを生成
  });
}

form.addEventListener("submit", function(event) {
  event.preventDefault(); // ブラウザのリロードを中断
  add();
})

function add(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text; // オブジェクトのtextを与える
  }

  if (todoText) {
    const li = document.createElement("li");
    li.innerText = todoText;
    li.classList.add("list-group-item");

    // リロード時にも打ち消し線を付与
    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }

    // 右クリック（削除機能）
    li.addEventListener("contextmenu", function(event) {
      event.preventDefault(); // 右クリック時の挙動をなくす
      li.remove();
      saveData(); // ローカルストレージにも削除データを反映
    })

    // 左クリック（完了マーク付与）
    li.addEventListener("click", function() {
      li.classList.toggle("text-decoration-line-through");
      saveData(); // ローカルストレージにもクラス名変更を反映
    });

    ul.appendChild(li);
    input.value = ""; // 入力後のフォーム値は空にする
    saveData(); // ブラウザのデータを保存
  }
}

// ブラウザデータをローカルストレージに保存する処理
function saveData() {
  const lists = document.querySelectorAll("li");
  let todoLists = []; // リストを格納する配列

  lists.forEach(list => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("text-decoration-line-through"), // 指定のクラスが入ってるとtrue,なければfalse
    };
    todoLists.push(todo);
  });
  // データの保存　→　localStorage.setItem('キー', '値')
  // ローカルストレージは文字列形式でデータが格納されるため、型変換が必要
  localStorage.setItem("todoData", JSON.stringify(todoLists));
}

