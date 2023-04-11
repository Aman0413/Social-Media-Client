import "./DeleteAccount.scss";

function DeleteAccount({ hadlePopUp, deleteUser }) {
  return (
    <>
      <div className="DeleteAccount" onClick={hadlePopUp}></div>
      <div className="delete-account-pop">
        <h4>Are you sure delete account ? </h4>
        <div className="response">
          <button className="btn-primary" onClick={hadlePopUp}>
            No
          </button>
          <button className="btn-primary" onClick={deleteUser}>
            Yes
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteAccount;
