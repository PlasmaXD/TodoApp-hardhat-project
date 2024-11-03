// ⓪ コンパイラバージョンを指定する
pragma solidity ^0.5.0;

// ① Contract名を宣言
contract TodoApp {

    uint num = 0;

    // ③ 構造体の性質を持った配列を変数todosとして定義
    struct Todo {
        uint taskid;
        string task;
        bool flag;
    }

    Todo[] public todos;

    // ④ mappingを宣言
    mapping (uint => address) public todoToOwner;

    // ⑤ mappingを宣言
    mapping (address => uint) public ownerTodoCount;

    // ⑥ Todoを作成する関数 （Gas発生）
    function TodoCreate(string memory _task) public {
        uint id = todos.push( Todo(num, _task, true) ) - 1;
        todoToOwner[id] = msg.sender;
        ownerTodoCount[msg.sender]++;
        num++;
    }

    // ⑦ Todoの状態を完了にする関数 （Gas発生）
    function TodoRemove(uint id) external {
        require(todoToOwner[id] == msg.sender);
        require(todos[id].flag);
        todos[id].flag = false;
    }

    // ⑧ 自分のイーサリアムアドレスに紐づくTodoのidを取得する関数 （ガス代不要）
  	function getTodosByOwner(address owner) external view returns(uint[] memory) {
    	uint[] memory result = new uint[](ownerTodoCount[owner]);
    	uint counter = 0;
    	for (uint i = 0; i < todos.length; i++) {
    		if (todoToOwner[i] == owner){
    			result[counter] = i;
    			counter++;
    		}
    	}
    	return result;
	}

}
