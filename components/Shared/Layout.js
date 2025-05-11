import React, { Suspense, lazy } from 'react';
import Header from './Items/Header';
import Footer from './Items/Footer';
import Modal from '../Modal/Modal';
import { useClicked } from '../../config/Clicked';
import { useEffect } from 'react';

const MobileTabMenu = lazy(() => import('./Items/MobileTabMenu'));
const RadioPlayer = lazy(() => import('./Items/RadioPlayer'));

export default function Layout({ children }) {
    const { modalOpen, clickedId } = useClicked();

    useEffect(() => {
        if (localStorage.getItem("scroll") !== 'null' && !modalOpen) {
            document.querySelector("html").scrollTop = localStorage.getItem("scroll");
            localStorage.setItem("scroll", "null");
        }
    }, [modalOpen]);

    return (
        <div>
            <div style={{ top: modalOpen ? (window.pageYOffset * -1) : 0 }} className={"content-wrapper " + (modalOpen ? " hidden" : "")} id="content-wrapper">
                <Suspense fallback={<div>Loading...</div>}>
                    <MobileTabMenu />
                </Suspense>
                <Header />
                {children}
                <Footer />
                <Suspense fallback={<div>Loading...</div>}>
                    <RadioPlayer />
                </Suspense>
            </div>
            <div className={"opacity-bg " + (modalOpen ? "active" : "")}></div>
            {modalOpen && <Modal />}
        </div>
    );
}
