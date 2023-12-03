import React, { Component } from "react";
import { toast, Flip } from "react-toastify";
import { getUsers } from "../../services/userService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils";
import UsersTable from "./usersTable";
import SearchBox from "../common/searchBox";

class Users extends Component {
	state = {
		users: [],
		pageSize: 10,
		currentPage: 1,
		searchQuery: "",
		isLoading: false,
		checkedUsers: [],
		editUser: {},
	};

	async componentDidMount() {
		this.setState({ isLoading: true });
		try {
			const { data: users } = await getUsers();
			setTimeout(() => this.setState({ users, isLoading: false }), 2000); // setTimeout is used just to simulate the loader
			// this.setState({ users, isLoading: false });
		} catch (error) {
			console.error(error);
			toast.error("Error while fetching users");
			this.setState({ isLoading: false });
		}
	}

	handleSearch = query => {
		if (this.state.editUser.id) return;
		this.handleResetAllCheckedUsers();
		this.setState({ searchQuery: query, currentPage: 1 });
	};

	handleSearchFocus = () => {
		if (this.state.editUser.id) {
			return toast.error("Please update or discard existing user changes");
		}
	};

	handlePageChange = page => {
		if (this.state.editUser.id) {
			return toast.error("Please update or discard existing user changes");
		}
		this.handleResetAllCheckedUsers();
		this.setState({ currentPage: page });
	};

	handleCheck = (isChecked, user) => {
		if (isChecked) {
			const checkedUsers = [...this.state.checkedUsers, user.id];
			this.setState({ checkedUsers });
		} else {
			let checkedUsers = [...this.state.checkedUsers];
			checkedUsers = checkedUsers.filter(
				checkedUser => checkedUser !== user.id
			);
			this.setState({ checkedUsers });
		}
	};

	handleAllCheck = isChecked => {
		const { data: users } = this.getPagedData();
		let checkedUsers = [];
		if (users && users.length && isChecked) {
			checkedUsers = users.map(user => user.id);
		}
		this.setState({ checkedUsers });
	};

	handleResetAllCheckedUsers = () => {
		this.setState({ checkedUsers: [] });
	};

	handleEditUser = user => {
		if (this.state.editUser.id) {
			return toast.error("Please update or discard existing user changes");
		}
		this.setState({ editUser: user });
	};

	handleUpdateUser = (event, path) => {
		let editUser = { ...this.state.editUser };
		editUser[path] = event.target.value;
		this.setState({ editUser });
	};

	handleEditCompleted = () => {
		let users = [...this.state.users];
		let editUser = { ...this.state.editUser };

		users = users.map(user => {
			if (user.id === editUser.id) {
				user = editUser;
			}
			return user;
		});
		this.setState({ users, editUser: {} });
		toast.success("User details updated");
	};

	handleEditCancel = () => {
		this.setState({ editUser: {} });
		toast.info("User details discarded");
	};

	handleDeleteUser = ({ id }) => {
		if (this.state.editUser.id) {
			return toast.error("Please update or discard existing user changes");
		}
		let users = [...this.state.users];
		users = users.filter(user => user.id !== id);
		this.setState({ users });
		toast.info("User deleted", {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

	handleDeleteCheckedUsers = () => {
		if (this.state.editUser.id) {
			return toast.error("Please update or discard existing user changes");
		}
		let checkedUsers = [...this.state.checkedUsers];
		let users = [...this.state.users];

		if (!checkedUsers.length) {
			toast.error("Please select user(s) to delete", {
				transition: Flip,
			});
			return;
		}
		users = users.filter(user => !checkedUsers.includes(user.id));
		toast.info(
			`${checkedUsers.length} ${
				checkedUsers.length > 1 ? "users" : "user"
			} deleted`,
			{
				position: toast.POSITION.TOP_RIGHT,
			}
		);
		this.setState({ users, checkedUsers: [] });
		this.handleResetAllCheckedUsers();
	};

	onDownClick = (user) => {
		const { users } = this.state;
		const switchedUsers = users;

		const index = users.indexOf(user);
		const hold = users[index];

		if (index === users.length - 1) {
			toast.info("No place to shift downwards", {
				position: toast.POSITION.TOP_RIGHT,
			});
		} else {
			switchedUsers[index] = switchedUsers[index+1];
			switchedUsers[index+1] = hold;
	
			this.setState({ users: switchedUsers });
		}
	}

	onUpClick = (user) => {
		const { users } = this.state;
		const switchedUsers = users;

		const index = users.indexOf(user);
		const hold = users[index];

		if (index === 0) {
			toast.info("No place to shift upwards", {
				position: toast.POSITION.TOP_RIGHT,
			});
		} else {
			switchedUsers[index] = switchedUsers[index-1];
			switchedUsers[index-1] = hold;
	
			this.setState({ users: switchedUsers });
		}
		
	}

	getPagedData = () => {
		const {
			pageSize,
			currentPage,
			users: allUsers,
			searchQuery,
			checkedUsers,
		} = this.state;

		let filtered = allUsers || [];

		if (searchQuery) {
			filtered = allUsers.filter(
				user =>
					user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
					user.role.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		let users = paginate(filtered, currentPage, pageSize);

		if (checkedUsers.length) {
			users = users.map(user => {
				user.checked = checkedUsers.includes(user.id);
				return user;
			});
		} else {
			users = users.map(user => {
				user.checked = false;
				return user;
			});
		}

		return { totalCount: filtered.length, data: users };
	};

	renderLoader = () => {
		return (
			<div
				className="spinner-grow text-primary position-absolute bottom-50 end-50"
				role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		);
	};

	renderSearchBox = totalCount => {
		return (
			<div className="row mt-5">
				<div className="row mt-5">
					<SearchBox
						value={this.state.searchQuery}
						onChange={this.handleSearch}
						onFocus={this.handleSearchFocus}
						totalCount={totalCount}
						placeholder="Search by name, email, role"
					/>
				</div>
			</div>
		);
	};

	renderNoUserFound = () => {
		return <span className="badge bg-danger mb-5">No user(s) found</span>;
	};

	renderUserTable = users => {
		const { checkedUsers, editUser } = this.state;

		return (
			<div className="row mx-1" style={{ overflowX: "auto" }}>
				<UsersTable
					users={users}
					checkedUsersCount={checkedUsers.length}
					editUser={editUser}
					usersCount={users.length}
					onDelete={this.handleDelete}
					handleDeleteUser={this.handleDeleteUser}
					handleCheck={this.handleCheck}
					handleAllCheck={this.handleAllCheck}
					handleEditUser={this.handleEditUser}
					handleUpdateUser={this.handleUpdateUser}
					handleEditCompleted={this.handleEditCompleted}
					handleEditCancel={this.handleEditCancel}
					onDownClick={this.onDownClick}
					onUpClick={this.onUpClick}
				/>
			</div>
		);
	};

	renderDeleteSelectedUser = () => {
		const { checkedUsers } = this.state;
		return (
			<div className="col-md-3 col-xs-12 mb-2">
				<button
					type="button"
					className="btn btn-outline-danger"
					onClick={this.handleDeleteCheckedUsers}>
					Delete selected{" "}
					{checkedUsers.length > 0 && (
						<span className="badge bg-danger">{checkedUsers.length}</span>
					)}
				</button>
			</div>
		);
	};

	renderPagination = totalCount => {
		const { pageSize, currentPage } = this.state;

		return (
			<div className="col-md-9 col-xs-12">
				<Pagination
					itemsCount={totalCount}
					pageSize={pageSize}
					onPageChange={this.handlePageChange}
					currentPage={currentPage}
				/>
			</div>
		);
	};

	render() {
		const { totalCount, data: users } = this.getPagedData();

		if (this.state.isLoading) return this.renderLoader();

		if (!users.length && this.state.currentPage > 1)
			this.handlePageChange(this.state.currentPage - 1);

		return (
			<React.Fragment>
				{this.renderSearchBox(totalCount)}
				{!users.length ? (
					this.renderNoUserFound()
				) : (
					<React.Fragment>
						{this.renderUserTable(users)}
						<div className="row">
							{this.renderDeleteSelectedUser()}
							{this.renderPagination(totalCount)}
						</div>
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}

export default Users;
