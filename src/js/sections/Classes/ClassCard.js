import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'
import R from 'ramda'

import ResponsiveImage from '../../components/ResponsiveImage'
import Avatar from '../../components/Avatar'
import Squiggle from '../../components/Squiggle'

import { makeParagraph } from '../../utils/text'
import { colors, mbolinks } from '../../constants'

/**
 * enhancer
 */

const mergeGroupedChoroegraphers = withProps(props => {
	const choreographers =
		props.isgroup === true
			? R.pipe(
					R.pluck('choreographers'),
					R.flatten,
					R.uniq,
			  )(props.grouped)
			: props.choreographers
	return { choreographers }
})

const enhanced = compose(mergeGroupedChoroegraphers)

/**
 * ClassCard
 */

class ClassCard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			activeChoreographer: props.choreographers[0] || false,
		}
	}

	componentDidMount() {
		this.startInterval()
	}

	componentWillUnmount() {
		clearInterval(this.choreographerInterval)
	}

	changeActiveChoreographer = id => {
		this.setState({
			activeChoreographer: this.props.choreographers.find(c => c.id === id),
		})
	}

	startInterval = () => {
		if (!this.props.choreographers) return
		if (this.props.choreographers.length < 2) return
		const { choreographers } = this.props
		const delay = Math.floor(Math.random() * 2) * 500
		clearInterval(this.choreographerInterval)
		setTimeout(() => {
			this.choreographerInterval = setInterval(() => {
				const currentIndex = choreographers.findIndex(c => c === this.state.activeChoreographer)
				const nextChoreographer =
					currentIndex === choreographers.length - 1 ? choreographers[0] : choreographers[currentIndex + 1]
				const { id } = nextChoreographer
				this.changeActiveChoreographer(id)
			}, 3000)
		}, delay)
	}

	handleChoreographerHover = id => {
		this.changeActiveChoreographer(id)
		this.startInterval()
	}

	renderChoreographers() {
		if (this.props.choreographers.length === 0) return null
		const activeId = this.state.activeChoreographer.id
		return (
			<div className="card__footer">
				<div className="card--class__choreographers">
					<h4>Choreographers</h4>
					<div className="card--class__avatarButtons">
						{this.props.choreographers.map(ch => (
							<button key={ch.id} onMouseEnter={() => this.handleChoreographerHover(ch.id)}>
								<p className={activeId === ch.id ? 'active' : ''}>{ch.firstname}</p>
							</button>
						))}
					</div>
					{this.props.choreographers.map(ch => (
						<div key={`name-${ch.id}`} style={{ display: ch.id === activeId ? 'initial' : 'none' }}>
							<Avatar key={ch.slug} image={ch.cover} videoSrc={ch.coverVideo} autoPlay ratio={1} classNames="avatar--round" />
						</div>
					))}
				</div>
			</div>
		)
	}

	render() {
		const num = this.props.index % 6
		const color = colors[this.props.index % colors.length]
		const cover = this.props.cover ? (
			<div className={`card__cover card__cover--${color}`}>
				<ResponsiveImage {...this.props.cover} />
			</div>
		) : null
		return (
			<div className="card card--class card--wide">
				<div className="card__header">
					<div className="card__title">
						<h3>{this.props.title}</h3>
					</div>
				</div>
				<Squiggle num={this.props.index % 6} color={color} />
				{cover}
				<div className="card__body">
					<div className="card__description">{makeParagraph(this.props.description)}</div>
				</div>
				{this.renderChoreographers()}
				{this.props.mbolink && this.props.mbolink && (
					<p className="card__cta">
						<a className="cta cta--primary" href={this.props.mbolink} rel="noopener noreferrer" target="_blank">
							Sign Up
						</a>
					</p>
				)}
			</div>
		)
	}
}

ClassCard.propTypes = {
	choreographers: PropTypes.arrayOf(PropTypes.shape()),
	index: PropTypes.number.isRequired,
}

ClassCard.defaultProps = {
	choreographers: [],
}

export default enhanced(ClassCard)
