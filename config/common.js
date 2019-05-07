/**
 * Common Configuration
 */
// Recommender config creator
exports.RECOMMENDER_CREATOR = (className, nearestNeighbors) => ({
	className,
	nearestNeighbors,
})

exports.PORT = process.env.PORT || '3000'