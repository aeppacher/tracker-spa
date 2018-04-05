import store from './store';

class Server {
	request_tasks() {
		$.ajax("/api/v1/tasks", {
			method: "get",
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			success: (response) => {
				store.dispatch({
					type: 'TASKS_LIST',
					tasks: response.data
				})
			}
		});
	}

	request_users() {
		$.ajax("/api/v1/users", {
			method: "get",
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			success: (response) => {
				store.dispatch({
					type: 'USERS_LIST',
					users: response.data
				})
			}
		});
	}

	submit_task(data) {
		$.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, task: data }),
      success: (response) => {
        store.dispatch({
          type: 'ADD_TASK',
          task: response.data,
        });
      },
    });
	}

	submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
    });
  }
}

export default new Server();