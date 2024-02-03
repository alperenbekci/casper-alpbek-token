import React from 'react';
import { Account, BuyMeACoffee, Section } from './components';
import Container from '../container';
import { GotRekt } from './components/GotRekt';

export const LandingBrief = () => {
	return (
		<Container>
			<h3>✨ Get totally alpbek!</h3>
			<Section>
				<span>When you buy into this project, you will:</span>
				<ul>
					<li>Get totally alpbek</li>
					<li>Get Laser Eyes</li>
					<li>Grow Facial Hair</li>
					<li>When, when, WHEN?!</li>
				</ul>
			</Section>
			<h3>🔝 Sign in</h3>
			<Section>
				<span>
					Get started now!
					<b
						onClick={event => {
							event.preventDefault();
							window.csprclick.signIn();
						}}
					>
						{' '}
						Connect
					</b>
					.
				</span>
			</Section>
		</Container>
	);
};

export const SignedInBrief = () => {
	return (
		<Container>
			<h2>🎉 Awesome! Let&#39;s get you alpbek!</h2>
			<h3 id='account'>🆔 We know who you are...</h3>
			<Account />

			<h3 id='buyCoffee'>☕ Get alpbek Now!</h3>
			<BuyMeACoffee />

			<h3 id='history'>⏳ Who got alpbek before you?</h3>
			<GotRekt />
		</Container>
	);
};
