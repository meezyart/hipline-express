import React from 'react'
import PropTypes from 'prop-types'
import { toClass } from 'recompose'

import PassCard from './PassCard'
import Highlight from '../../components/Highlight'

import { wrapAndPrepare } from '../../utils/text'

/**
 * PassSection
 */

const PassSection = props => {
	return (
		<div className="info__section info__section--passtype">
			<div className="info__header column column--narrow">
				<h3 className="info__title">
					<Highlight text={props.title} />
				</h3>
				<div className="info__subtitle">
					{wrapAndPrepare('p')(props.description)}
				</div>
			</div>
			<div className="cards">
				{props.passes
					.filter(p => p.isVisible === true)
					.map(p => <PassCard key={p.slug} {...p} />)}
			</div>
		</div>
	)
}

PassSection.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	passes: PropTypes.arrayOf(PropTypes.shape()),
}

PassSection.defaultProps = {
	description: '',
	passes: [],
}

export default toClass(PassSection)
