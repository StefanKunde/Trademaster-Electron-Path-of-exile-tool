import * as React from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { fetchAllMaps } from '../../../../redux/PoeNinja/actions';

interface IProps {}

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
	  <div>
		  Home...
	  </div>
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