import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../../components/LoadingSpinner';
import CategoryList from '../../components/CategoryList';
import ErrorModal from '../../components/ErrorModal';

function Category() {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategoriesData = async () => {
      let responseData;
      try{
        responseData = await sendRequest(`http://localhost:3500/api/category/get`);
        setCategories(responseData.categories);
      }catch(err) {}
    }

    getCategoriesData();
  }, [sendRequest]);

  const categoryDeleteHandle = (deleteCategoryId) => {
      setCategories(prevCategory =>
          prevCategory.filter(categories => categories._id !== deleteCategoryId)
      );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClose={clearError} />
      { isLoading && <LoadingSpinner /> }

      { categories && <CategoryList categories={categories} categoryDeleteHandle={categoryDeleteHandle} />}
    </React.Fragment>
  )
}

export default Category