/* eslint-disable no-undef */
import React, { Component } from "react";
import Table from "../common/table";
import "./usersTable.css";

class UsersTable extends Component {
	columns = [
		{
			path: "check",
			label: columnProps => this.getCheckAllContent(columnProps),
			key: "check",
			content: (user, columnProps) => this.getCheckContent(user, columnProps),
			editable: false,
		},
		{
			path: "name",
			label: "Name",
			editable: true,
			editType: "inputText",
			editData: "",
		},
		{
			path: "email",
			label: "Email",
			editable: true,
			editType: "inputText",
			editData: "",
		},
		{
			path: "role",
			label: "Role",
			editable: true,
			editType: "inputSelect",
			editData: ["Admin", "Member"],
		},
		{
			path: "actions",
			label: "Actions",
			key: "actions",
			content: (user, columnProps, isEditing) =>
				// this.getSwitchRowContent(user, columnProps, isEditing),
				this.getActionsContent(user, columnProps, isEditing),
			editable: false,
		},
	];

	getCheckAllContent = columnProps => {
		return (
			<input
				className="form-check-input"
				type="checkbox"
				checked={columnProps.usersCount === columnProps.checkedUsersCount}
				id="checkAllUsers"
				onChange={event => columnProps.handleAllCheck(event.target.checked)}
			/>
		);
	};

	getCheckContent = (user, columnProps) => {
		return (
			<div className="form-check">
				<input
					className="form-check-input"
					type="checkbox"
					checked={user.checked}
					id={user.id}
					onChange={event =>
						columnProps.handleCheck(event.target.checked, user)
					}
				/>
			</div>
		);
	};

	getActionsContent = (user, columnProps, isEditing) => {
		return isEditing ? (
			<div className="mt-2">
				<i
					className="bi bi-check-lg text-primary"
					onClick={() => columnProps.handleEditCompleted()}></i>
				<i
					className="bi bi-x-lg text-danger mx-2"
					onClick={() => columnProps.handleEditCancel()}></i>
			</div>
		) : (
			<div>
				<i
					className="bi bi-pencil-square text-primary"
					onClick={() => columnProps.handleEditUser(user)}></i>
				<i
					className="bi bi-trash text-danger mx-2"
					onClick={() => columnProps.handleDeleteUser(user)}></i>
			</div>
		);
	};

	getSwitchRowContent = (user, columnProps, isEditing) => {
		return <div style={{ display: 'flex'}}>
			<div style={{ marginRight: '5px', cursor: 'pointer' }} onClick={() => columnProps.onDownClick(user)}>&#8595;</div>
			<div style={{ cursor: 'pointer' }} onClick={() => columnProps.onUpClick(user)}>&#8593;</div>
		</div>
	}

	render() {
		const {
			users,
			editUser,
			usersCount,
			checkedUsersCount,
			handleCheck,
			handleAllCheck,
			handleDeleteUser,
			handleEditUser,
			handleEditCompleted,
			handleEditCancel,
			handleUpdateUser,
			onDownClick,
			onUpClick
		} = this.props;
		const columnProps = {
			checkedUsersCount,
			usersCount,
			handleCheck,
			handleAllCheck,
			handleDeleteUser,
			handleEditUser,
			handleEditCompleted,
			handleEditCancel,
			handleUpdateUser,
			handleItemUpdateData: handleUpdateUser,
			onDownClick, onUpClick
		};
		const rowProps = {
			rowCheckedClass: "th-background",
		};

		return (
			<Table
				columns={this.columns}
				data={users}
				rowProps={rowProps}
				columnProps={columnProps}
				editItem={editUser}
			/>
		);
	}
}

export default UsersTable;
