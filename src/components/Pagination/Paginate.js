import React from "react";
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts} from "../../actions/actions";
import useStyles from './styles';


const Paginate = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const {totalPage} = useSelector(state => state.posts? state.posts : 1);
  const query = new URLSearchParams(useLocation().search); //useLocation().search contains queryString
  const [page, setPage] = React.useState(query.get("page") || 1); //set to page from URL or 1 if page query doesn't exist
  

  React.useEffect(() => {
    //console.log(query.get('page'));
    dispatch(getPosts(page));
  }, [page])

  const handleChange = (e, value) => {
    setPage(value);
  }

  return (
    <Pagination onChange={handleChange} className={classes.ul} page={Number(page)||1} count={totalPage} variant="outlined" color='primary' renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}/>
  );
};

export default Paginate;
