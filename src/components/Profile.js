const Profile = (props) => {
    return (
        <div>
            <img src={props.currentProfile.picture.large} alt="Profile picture"/>
            <p>{props.currentProfile.details.firstname + " " + props.currentProfile.details.lastname}</p>
            <p>{props.currentProfile.details.city + ", " + props.currentProfile.details.country}</p>
            <p>Joined {props.currentProfile.membership.date_joined}</p>
        </div>
    )
}

export default Profile;