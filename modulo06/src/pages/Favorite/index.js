import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

export default function Favorite({ navigation }) {
    const repository = navigation.getParam('starred');

    return (
        <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />
    );
}

Favorite.propTypes = {
    navigation: PropTypes.shape({
        getParam: PropTypes.func,
    }).isRequired,
};

Favorite.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('starred').name,
});
