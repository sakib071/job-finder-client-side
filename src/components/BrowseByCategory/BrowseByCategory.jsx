import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CategoryCard from './CategoryCard';
import { useEffect } from 'react';

const BrowseByCategory = () => {

    useEffect(() => {
        
    }, [])

    return (
        <div>
            <h3 className="text-3xl font-bold text-center mb-20">Browse By Category</h3>
            <div>
                <Tabs>
                    <div className="text-center">
                        <TabList>
                            <Tab>
                                <p className="font-semibold">Web Development</p>
                            </Tab>
                            <Tab><p className="font-semibold">Digital Marketing</p></Tab>
                            <Tab><p className="font-semibold">Graphics Design</p></Tab>
                        </TabList>
                        <TabPanel>
                            <h2>Any content 1</h2>
                            <div>
                                <CategoryCard></CategoryCard>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 3</h2>
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default BrowseByCategory;