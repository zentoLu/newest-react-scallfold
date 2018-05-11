/**
 * 导出通用的包
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ajaxPost } from 'request'
import Tool from 'tool'

const prdCode = '001240';
const fundAcc = '9595000032396007';

export { React, Link, connect, ajaxPost, Tool, prdCode, fundAcc }
