import { useState, useEffect } from 'react';
import TabTitle, { TabItem, TabType } from './tab-title/tab-title';
import TabDescription from './tab-description/tab-description';
import TabSpecs from './tab-specs/tab-specs';
import { useSearchParams } from 'react-router-dom';

type TabpProps = {
  vendorCode: string | undefined;
  type: string | undefined;
  category: string | undefined;
  description: string | undefined;
  level: string | undefined;
}


const TAB_TITLES: TabItem[] = [
  {
    title: 'Характеристики',
    id: 'specs',
  },
  {
    title: 'Описание',
    id: 'description',
  },
];

function Tabs({ description, level, type, category, vendorCode }: TabpProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabType>(TAB_TITLES[0].id);
  const [params] = useSearchParams();

  useEffect(() => {
    const tabParam = params.get('tab');
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam as TabType);
    }
  }, [params, activeTab]);

  const tabContent = () => {
    switch (activeTab) {
      case 'specs':
        return <TabSpecs level={level} type={type} category={category} vendorCode={vendorCode} />;
      case 'description':
        return <TabDescription description={description} />;
    }
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {TAB_TITLES.map((tabItem) =>
          (<TabTitle key={tabItem.id} tabItem={tabItem} isActive={activeTab === tabItem.id} onClick={() => setActiveTab(tabItem.id)} />)
        )}
      </div>
      <div className="tabs__content">
        {tabContent()}
      </div>
    </div>
  );
}

export default Tabs;
