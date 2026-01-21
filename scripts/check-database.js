#!/usr/bin/env node
const { MongoClient } = require('mongodb')

async function checkDatabase() {
  const url = process.env.DATABASE_URI || 'mongodb://localhost:27017'
  const dbName = 'dmp-compro'
  
  const client = new MongoClient(url)
  
  try {
    console.log('🔗 Connecting to MongoDB...')
    await client.connect()
    console.log('✅ Connected successfully!')
    
    const db = client.db(dbName)
    
    // List all collections
    console.log('\n📋 DATABASE COLLECTIONS:')
    const collections = await db.listCollections().toArray()
    
    if (collections.length === 0) {
      console.log('   No collections found in database')
    } else {
      collections.forEach((collection, index) => {
        console.log(`   ${index + 1}. ${collection.name}`)
      })
    }
    
    console.log('\n🔍 COLLECTION DETAILS:')
    
    for (const collection of collections) {
      const collectionName = collection.name
      const coll = db.collection(collectionName)
      
      // Count documents
      const count = await coll.countDocuments()
      
      // Get sample document
      const sampleDoc = await coll.findOne()
      
      console.log(`\n📁 Collection: ${collectionName}`)
      console.log(`   Documents: ${count}`)
      
      if (sampleDoc) {
        console.log(`   Sample structure:`)
        const fields = Object.keys(sampleDoc)
        fields.forEach(field => {
          const value = sampleDoc[field]
          const type = Array.isArray(value) ? 'Array' : typeof value
          console.log(`     • ${field}: ${type}`)
        })
      }
    }
    
    // Check specific collections data
    console.log('\n📊 DATA SAMPLES:')
    
    const servicesToCheck = ['services', 'abouts', 'portfolio', 'media', 'users']
    
    for (const collName of servicesToCheck) {
      try {
        const collection = db.collection(collName)
        const count = await collection.countDocuments()
        
        if (count > 0) {
          console.log(`\n🗂️  ${collName.toUpperCase()} (${count} documents):`)
          
          if (collName === 'services') {
            const services = await collection.find({}).limit(3).toArray()
            services.forEach(service => {
              console.log(`   • ${service.title || service.name || 'Untitled'} (${service.status || 'No status'})`)
            })
          } else if (collName === 'abouts') {
            const about = await collection.findOne()
            if (about) {
              console.log(`   • Title: ${about.title}`)
              console.log(`   • Values: ${about.values?.length || 0} items`)
              console.log(`   • Timeline: ${about.timeline?.length || 0} items`)
              console.log(`   • Team: ${about.team?.length || 0} members`)
            }
          } else if (collName === 'users') {
            const users = await collection.find({}).toArray()
            users.forEach(user => {
              console.log(`   • ${user.email} (${user.role || 'No role'})`)
            })
          } else {
            const sample = await collection.findOne()
            if (sample) {
              console.log(`   • ${sample.title || sample.name || sample._id}`)
            }
          }
        }
      } catch (err) {
        // Collection might not exist, skip
      }
    }
    
  } catch (error) {
    console.error('❌ Error connecting to database:', error)
  } finally {
    await client.close()
    console.log('\n🔌 Connection closed')
  }
}

checkDatabase()
