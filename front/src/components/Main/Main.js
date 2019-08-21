import React, {Component} from "react";
import {connect} from "react-redux";

import Photos from "../Photos";

import style from "./styles.css"
import OrderByAction from "../../store/photos/actions/OrderByAction";
import OrderByDescAction from "../../store/photos/actions/OrderByDescAction";
import orderByLikes from "../../helpers/orderByLikes"


const mapStateToProps = function (state) {
    return {
        state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        orderByDescAction: (ids) => {
            dispatch(OrderByDescAction(ids));
        },
        orderByAction: (ids) => {
            dispatch(OrderByAction(ids));
        }
    }
};
let buff = 0;

let sortedPhotosIds = [];

class Main extends Component {
    render() {
        if (buff === 0) {
            sortedPhotosIds=[];
            sortedPhotosIds = orderByLikes(this.props.state.photos);
            this.props.orderByDescAction(sortedPhotosIds);
            buff = 1;
        }
        return <div>
            <div className={style.category}>
                <div className={style.font}>
                    <button ref={"popular"}
                            onClick={() => {
                                sortedPhotosIds=[];
                                sortedPhotosIds = orderByLikes(this.props.state.photos);
                                this.props.orderByDescAction(sortedPhotosIds);

                                this.refs.popular.setAttribute("class", style.selectedButton);
                                this.refs.news.setAttribute("class", style.button);
                                // ставим активной кнопку "по убыванию"
                                this.refs.buttonOrderByDesc.setAttribute("class", style.selectedFontLink);
                                this.refs.buttonOrderBy.setAttribute("class", style.fontLink);
                                this.refs.buttonOrderByDesc.setAttribute("disabled", "disabled");
                                this.refs.buttonOrderBy.removeAttribute("disabled");

                            }} className={style.selectedButton}>Популярное
                    </button>
                </div>
                <a className={style.font}>|</a>
                <div className={style.font}>
                    <button ref={"news"} onClick={() => {
                        this.refs.news.setAttribute("class", style.selectedButton);
                        this.refs.popular.setAttribute("class", style.button);
                    }
                    } className={style.button}>Новое
                    </button>
                </div>
                <div className={style.links}>
                    <button onClick={() => {
                        this.refs.buttonOrderByDesc.setAttribute("class", style.selectedFontLink);
                        this.refs.buttonOrderBy.setAttribute("class", style.fontLink);
                        this.refs.buttonOrderByDesc.setAttribute("disabled", "disabled");
                        this.refs.buttonOrderBy.removeAttribute("disabled");
                        sortedPhotosIds=[];
                        sortedPhotosIds = orderByLikes(this.props.state.photos);
                        console.log(sortedPhotosIds);
                        console.log("что мне делать");
                        this.props.orderByDescAction(sortedPhotosIds);

                    }} ref={"buttonOrderByDesc"} className={style.selectedFontLink}>По убыванию
                    </button>
                    <a className={style.fontLink}>|</a>
                    <button onClick={() => {
                        this.refs.buttonOrderByDesc.setAttribute("class", style.fontLink);
                        this.refs.buttonOrderBy.setAttribute("class", style.selectedFontLink);
                        this.refs.buttonOrderBy.setAttribute("disabled", "disabled");
                        this.refs.buttonOrderBy.removeAttribute("disabled");
                        this.refs.buttonOrderByDesc.removeAttribute("disabled");
                        sortedPhotosIds=[];
                        sortedPhotosIds = orderByLikes(this.props.state.photos);
                        console.log(sortedPhotosIds);
                        console.log("что мне делать");
                        this.props.orderByAction(sortedPhotosIds);
                    }} ref={"buttonOrderBy"} className={style.fontLink}>По возрастанию
                    </button>
                </div>
            </div>

            <div className={style.photo}>
                <Photos photos={this.props.state.photos}/>
            </div>
        </div>
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Main);