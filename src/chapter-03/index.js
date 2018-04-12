import { store } from './BookStore';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Paper, Typography } from 'material-ui';
import { inject, observer, Provider } from 'mobx-react';

import DevTools from 'mobx-react-devtools';
import { ResultsList, SearchTextField } from './components';

@inject('store')
@observer
class App extends React.Component {
    render() {
        const { store } = this.props;

        return (
            <Fragment>
                <Header />

                <Grid container>
                    <Grid item xs={12}>
                        <Paper elevation={2} style={{ padding: '1rem' }}>
                            <SearchTextField
                                store={store}
                                onChange={this.updateSearchText}
                                onEnter={store.search}
                            />
                        </Paper>
                    </Grid>

                    <ResultsList store={store} style={{ marginTop: '2rem' }} />
                </Grid>
            </Fragment>
        );
    }

    updateSearchText = event => {
        this.props.store.setTerm(event.target.value);
    };
}

function Header() {
    return (
        <Typography
            variant="title"
            color="inherit"
            style={{ marginBottom: 20, textAlign: 'center' }}
        >
            MobX QuickStart Book Store
        </Typography>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <Fragment>
            {/*<DevTools />*/}
            <App />
        </Fragment>
    </Provider>,
    document.getElementById('root'),
);