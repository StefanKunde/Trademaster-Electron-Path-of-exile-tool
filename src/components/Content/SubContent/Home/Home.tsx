import * as React from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { fetchAllMaps } from '../../../../redux/PoeNinja/actions';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

interface IProps { }

interface DispatchProps {
	fetchAllMaps: () => void;
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & DispatchProps & IProps;

class Home extends React.Component<Props, any> {

	componentDidMount() {
		console.log('invoked fetchAllMaps in cwm');
		this.props.fetchAllMaps();
	}

	render() {
		return (
			<div id='home-div'>
				<div className="card card-pricing bg-primary">
					<div className="card-body ">
						<div className="card-icon">
							<PlayCircleFilledIcon />
						</div>
						<h3 className="card-title">Inject</h3>
						<p className="card-description">
							Inject the TradeMaster into your game. Make sure your game is
							running!</p>
						<button id="playnow" className="btn btn-white btn-round">Inject</button>
					</div>
				</div>
			</div >
		);
	}
}

const mapStateToProps = ({ poeNinjaData }: RootState) => {
	const props = {
		allMaps: poeNinjaData.poeNinjaData.allMaps,
	};
	return props;
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
	return {
		fetchAllMaps: async () => {
			dispatch(fetchAllMaps());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);