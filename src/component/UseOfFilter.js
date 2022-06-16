import React from 'react';
var total;
class UseOfFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          people : [
              {
                name: 'James',
                age: 31,
              },
              {
                name: 'John',
                age: 45,
              },
              {
                name: 'Paul',
                age: 65,
              },
              {
                name: 'Ringo',
                age: 49,
              },
              {
                name: 'George',
                age: 34,
              }
              ],
        };

      }
    
    render() {
      const {people} = this.state;
      return (
        <div>
            <div style={{height: '100vh'}} className='d-flex align-items-center justify-content-center'>
                    <div style={{width: '500px', padding:'30px', borderRadius:'10px', boxShadow:'0px 0px 20px rgb(0 0 0 / 15%)'}}>
                        <h6>Filterd data</h6>
                        <ul>
                        {people.filter(person => person.age < 40).map((filteredPerson, index) => (
                          <li key={index}>
                            {filteredPerson.name + '-' + filteredPerson.age}
                          </li>
                        ))}
                        </ul>
                    </div>
                </div>
        </div>
      );
    }
  }
  export default UseOfFilter;
