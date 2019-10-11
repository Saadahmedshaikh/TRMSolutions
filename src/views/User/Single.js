import react from "react";

const single = (props)=>{
    return(
        <tr>
                                    <td>{i}</td>
                                    <td>{props.user.CompanyUserLoginID}</td>
                                    <td>{props.user.CompanyUserName}</td>
                                    <td>{props.user.UserRoleName}</td>
                                    <td>{props.user.CompanyName}</td>
                                    <td>{(props.user.CompanyUserStatus==="1")?<Badge color="success">Active</Badge>:<Badge color="danger">In Active</Badge>}</td>
                                    
                                </tr>
    )
}