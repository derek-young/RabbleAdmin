import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../redux/store.js';
import styles from '../Styles.css';
import localStyles from './ConfigStyles.css';
import firebase from 'firebase';
import { firebaseUpdate } from '../../redux/actions/firebaseActions';

class InviteFriends extends React.Component {
 constructor(props){
  super(props);
 }

sendPendingInvite () {
  const groupId = this.props.groupId;
  const name = this.props.groupName;
  let pendingInvites = {}
  let fromDom = document.querySelectorAll('input[type="checkbox"]:checked');
  let checkedUsers = [];
  for(var x = 0; x < fromDom.length; x++) {
    checkedUsers.push(fromDom[x].value);
  }
  pendingInvites[groupId] = name;

  for (var i = 0; i < checkedUsers.length; i++) {
    firebaseUpdate(`users/${ checkedUsers[i] }/pendingInvites`,pendingInvites)
  }
}

  render(){

  return(
  <div className="custom-container">
    <div className={localStyles.header}>
			<h3>Invite Your Friends</h3>
		</div>
    <div className={styles.scrollView}>
      <form id="check_table">
        {this.props.friendList.map((friend, index) => (
          <div
            key={index}
            className={localStyles.iFriend}>
            <input type="checkbox" name={friend.label} value={friend.firebaseId}/>
            <h4>{friend.label}</h4>
          </div>
        ))}
      </form>
    </div>
    <div className={localStyles.iFooter}>
      <Link to="/map">
        <button onClick={this.sendPendingInvite.bind(this)}>Invite</button>
      </Link>
      <div>
        <Link to="/map">
          Skip
        </Link>
      </div>
    </div>
  </div>
  )
}
}

export default connect((store) => {
	return {
		friendList: store.user.friendList.data,
    groupId: store.user.groupId,
    groupName: store.user.groupName
	}
})(InviteFriends)
