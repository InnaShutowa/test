import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 400,
    },
}));

export default useStyles;