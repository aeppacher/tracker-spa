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
		console.log("getting the users");
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

	submit_user(data) {
		console.log(data, "data");
		$.ajax("/api/v1/users", {
			method: "post",
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({ user: data }),
			success: (response) => {
				console.log(response, "response");
				store.dispatch({
					type: 'ADD_USER',
					user: response.data
				})
			}
		});
	}

	submit_task(form, token) {
		console.log(form, "submit data");
		console.log(token, "submit token");
		$.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: token, task: form }),
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

	delete_user(data) {
		console.log(data.id);
    $.ajax("/api/v1/users/" + data.id, {
			method: "delete",
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({ id: data.id }),
			success: (response) => {
				console.log(response, "response");
				store.dispatch({
					type: 'DELETE_USER',
					user: response.data
				})
			}
		});
	}

	manage_user(data) {
		$.ajax("/api/v1/manages", {
			method: "post",
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			data: data,
			success: (response) => {
				console.log(response, "response");
				store.dispatch({
					type: 'DELETE_USER',
					user: response.data
				})
			}
		});
	}
}

export default new Server();