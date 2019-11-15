import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';
import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Author,
    Title,
} from './styles';

// import { Container } from './styles';

export default class User extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('user').name,
    });

    static propTypes = {
        navigation: PropTypes.shape({
            getParam: PropTypes.func,
        }).isRequired,
    };

    state = {
        stars: [],
        page: 1,
        loading: false,
    };

    async componentDidMount() {
        this.load();
    }

    load = async (page = 1) => {
        const { stars } = this.state;
        const { navigation } = this.props;
        const user = navigation.getParam('user');

        const response = await api.get(`/users/${user.login}/starred`, {
            params: { page },
        });

        this.setState({
            stars: page >= 2 ? [...stars, ...response.data] : response.data,
            page,
            loading: false,
        });
    };

    loadMore = () => {
        const { page } = this.state;

        const nextPage = page + 1;

        this.load(nextPage);
    };

    render() {
        const { navigation } = this.props;
        const { stars, loading } = this.state;
        const user = navigation.getParam('user');

        return (
            <Container>
                <Header>
                    <Avatar source={{ uri: user.avatar }} />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio ? user.bio : '...'}</Bio>
                </Header>
                {loading ? (
                    <ActivityIndicator color="#7159c1" />
                ) : (
                    <Stars
                        data={stars}
                        onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
                        onEndReached={this.loadMore} // Função que carrega mais itens
                        keyExtractor={star => String(star.id)}
                        renderItem={({ item }) => (
                            <Starred>
                                <OwnerAvatar
                                    source={{ uri: item.owner.avatar_url }}
                                />
                                <Info>
                                    <Title>{item.name}</Title>
                                    <Author>{item.owner.login}</Author>
                                </Info>
                            </Starred>
                        )}
                    />
                )}
            </Container>
        );
    }
}
