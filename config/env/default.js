'use strict';

module.exports = {
	app: {
		title: 'Daniel Kay - Portfolio',
		description: 'MEAN.JS Portfolio Application',
		keywords: 'mongodb, express, angularjs, node.js, mongoose, passport, portfolio, application, app, daniel, kay',
		googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions'
};
