const Profile = (props) => {

    const date = () => {
        let d = new Date(props.currentProfile.membership.date_joined);
        return d.toDateString();
    }

    return (
        <div>
            <img src={props.currentProfile.picture.large} alt="Profile picture"/>
            <p>{props.currentProfile.details.firstname + " " + props.currentProfile.details.lastname}</p>
            <p>{props.currentProfile.details.city + ", " + props.currentProfile.details.country}</p>
            <p>Joined {date()}</p>
        </div>
    )
}

export default Profile;