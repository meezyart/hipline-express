import React from 'react'
import PropTypes from 'prop-types'
import { ScrollableContainer, ScrollableChild } from '../../UI/Scroll'
import ClassSection from './ClassSection'
import Splash from '../Splash'

/**
 * Main Class section
 */

const Classes = props => {
	const visibleClasstypes = props.classtypes.filter(c => c.isVisible === true)
	return (
		<ScrollableContainer containerElement={document.body}>
			<div>
				<Splash text={props.splashText} />

				<section className="classes with-aside">
					<main>
						<div className="column--wide">
							<div>
								{visibleClasstypes.map(c => (
									<ScrollableChild key={`trigger-classSection-${c.slug}`} slug={`classSection-${c.slug}`}>
										<ClassSection {...c} />
									</ScrollableChild>
								))}
							</div>
						</div>
					</main>
				</section>
			</div>
		</ScrollableContainer>
	)
}

Classes.propTypes = {
	classtypes: PropTypes.arrayOf(PropTypes.shape),
	splashText: PropTypes.string,
}

Classes.defaultProps = {
	classtypes: [],
	splashText: '',
}

export default Classes
