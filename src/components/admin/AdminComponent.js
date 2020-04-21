import React from "react";
import "./AdminComponent.css"
import userService from "../../services/UserService"
import NavBarComponent from "../NavBarComponent"


export default class AdminComponent extends React.Component {

    state = {
        users: [],
        editing: {}
    }

    componentDidMount() {
        userService.findAllUsers()
            .then(users => this.setState({users: users}))
    }

    update = () => {
        userService.updateUser(this.state.editing.id, this.state.editing)
            .then(response => {
                this.setState({
                    editing: {},
                });
            })
    }

    render() {

        return (
            <div class="container-fluid">
                <NavBarComponent
                    profile={this.props.profile}
                    logout={this.props.logout}
                />

                {Object.keys(this.props.profile).length > 0 && this.props.profile.role === "ADMIN" &&
                
                <div>

                    <h1 class="display-3 text-center">Admin Page</h1>

                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Role</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user, idx) =>


                                <tr>
                                    <th scope="row">{idx}</th>
                                    <td>{user.username}</td>

                                    {this.state.editing.id !== user.id &&
                                    <td>{user.role || "REGULAR"}</td>
                                    }

                                    {this.state.editing.id === user.id &&
                                    <td>
                                        <select class="form-control" defaultValue={this.state.editing.role}
                                            onChange={(e) => {
                                                user['role'] = e.target.value;
                                                this.setState({editing: {...this.state.editing, role: e.target.value}});
                                            }}>
                                            <option value="REGULAR">Regular</option>
                                            <option value="ADMIN">Admin</option>
                                        </select>
                                    </td>

                                    }

                                    {this.state.editing.id !== user.id &&
                                        <td>
                                            <button class="btn btn-success" onClick={() => this.setState({editing: user})}>
                                                Edit
                                            </button>
                                        </td>
                                    }

                                    {this.state.editing.id === user.id &&
                                        <td>
                                            <button class="btn btn-danger" onClick={() => this.update()}>
                                                Confirm
                                            </button>
                                        </td>
                                    }

                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
                }


                {this.props.profile.role !== "ADMIN" &&
                    <h1 class="display-1 text-center">You do not have proper permissions to view this page</h1>
                }
            </div>


        )



    }

}