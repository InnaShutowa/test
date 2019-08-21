import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";

import ChangeRatingAction from "../../store/photos/actions/ChangeRatingAction";

import style from "./styles.css";

const mapStateToProps = function (state) {
    return {
        photos: state.photos
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeRationAction: (id, a) => {
            dispatch(ChangeRatingAction(id, a));
        }
    }
};

class RatingButtons extends Component {
    render() {
        return <div className={style.elms}>

            <button onClick={() => {
                if (this.props.currentUserRating === 0) {
                    this.props.changeRationAction(this.props.id, 1);
                    return;
                }
                if (this.props.currentUserRating === 1) {
                    this.props.changeRationAction(this.props.id, -1);
                }

            }} disabled={this.props.currentUserRating === -1}
                    className={this.props.currentUserRating === 1 ? style.selectedLike : style.like}>+
            </button>


            <p className={style.text}>{
                this.props.likes
            }</p>


            <button onClick={() => {
                if (this.props.currentUserRating === 0) {
                    this.props.changeRationAction(this.props.id, -1);
                    return;
                }
                if (this.props.currentUserRating === -1) {
                    this.props.changeRationAction(this.props.id, 1);
                }
            }} disabled={this.props.currentUserRating === 1}
                    className={this.props.currentUserRating === -1 ? style.selectedDislike : style.dislike}>-
            </button>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingButtons);