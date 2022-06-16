import React from 'react';
var total;
class UseOfReduce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students : [
                {
                  id: "11",
                  marks: 31
                },
                {
                  id: "12",
                  marks: 80
                },
                {
                  id: "3",
                  marks: 98
                }
              ],
        };

      }
    
    render() {
      return (
        <div>
            <div style={{height: '100vh'}} className='d-flex align-items-center justify-content-center'>
                    <div style={{width: '500px', padding:'30px', borderRadius:'10px', boxShadow:'0px 0px 20px rgb(0 0 0 / 15%)'}}>
                        <h6>Users data</h6>
                        <ul>
                            {this.state.students.map((students, index ) => (
                                <li key={index}>
                                {"id -" + students.id +'----'+ "Marks -" + students.marks}
                                </li>
                            ))}
                        </ul>

                        <h6>Reduce applies on data</h6>
                        <div>
                        Total Marks : 
                            {
                                total = this.state.students.reduce(function(prev, current) {
                                    return prev+current.marks;
                                  }, 0)
                            }
                        </div>
                        {/* <Button className='mt-4 mr-2' onClick={this.handleDashboardAccess} variant="primary" type="button"> Submit </Button> &nbsp;&nbsp;
                        <Button className='mt-4' onClick={this.handleLogOut} variant="primary" type="button"> Log Out </Button> */}
                    </div>
                </div>
        </div>
      );
    }
  }
  export default UseOfReduce;
