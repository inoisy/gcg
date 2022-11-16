import gql from 'graphql-tag';
export default gql`
query MainQuery {
  categories {
    data {
      attributes{
        slug
        name
        projects{
          data{
            attributes{
              slug
              title
              dateEnd
              dateStart
              img{
                data{
                  attributes{
                    url
                    width
                    formats
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
