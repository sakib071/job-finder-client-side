import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CategoryCard from './CategoryCard';
import { useEffect, useState } from 'react';

const BrowseByCategory = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('webDevelopment');

    useEffect(() => {
        fetch(`http://localhost:5000/jobs?category=webDevelopment`)
            .then((response) => response.json())
            .then((data) => setJobs(data.filter(job => job.category == selectedCategory)));
    }, [selectedCategory]);

    const handleCategory = (selectedCategory) => {
        console.log("Clicked: " + selectedCategory);
        setSelectedCategory(selectedCategory);
    }

    return (
        <div>
            <h3 className="text-3xl font-bold text-center mb-20">Browse By Category</h3>
            <div>
                <Tabs>
                    <div className="text-center">
                        <TabList>
                            <Tab onClick={() => handleCategory('webDevelopment')}>
                                <p className="font-semibold">Web Development</p>
                            </Tab>
                            <Tab onClick={() => handleCategory('digitalMarketing')}>
                                <p className="font-semibold">Digital Marketing</p>
                            </Tab>
                            <Tab onClick={() => handleCategory('graphicsDesign')}>
                                <p className="font-semibold">Graphics Design</p>
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <div className='container grid grid-cols-4 p-5 justify-center items-center gap-5 mx-auto mt-10'>
                                {jobs.map((job) => (
                                    <CategoryCard key={job.id} job={job} />
                                ))}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='container grid grid-cols-4 p-5 justify-center items-center gap-5 mx-auto mt-10'>
                                {jobs.map((job) => (
                                    <CategoryCard key={job.id} job={job} />
                                ))}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='container grid grid-cols-4 p-5 justify-center items-center gap-5 mx-auto mt-10'>
                                {jobs.map((job) => (
                                    <CategoryCard key={job.id} job={job} />
                                ))}
                            </div>
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default BrowseByCategory;
